// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// import "forge-std/interfaces/IERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";



contract WellNexus {

    struct User {
        uint256 user_id;
        address user_address;
        string image_url;
        string name;
        uint256 balance;
        string gender;
        string occupation;
        uint256 total_appointments;
    }

    struct Doctor {
        uint256 doctor_id;
        address doctor_address;
        string image_url;
        string name;
        uint256 balance;
        string gender;
        uint256 charge_per_hour;
        string specialty;
        uint256 total_appointments;
    }

    enum Session {
        not_selected,
        Session1,
        Session2,
        Session3,
        Session4,
        Session5,
        Session6,
        Session7,
        Session8,
        Session9,
        Session10
    }

    enum appointmentStatus {
        free,
        awaiting_confirmation,
        confirmed,
        onGoing,
        canceled
    }


    struct Appointment {
        uint256 appointment_id;
        address doctor;
        address patient;
        uint256 Year;
        uint256 Month;
        uint256 Day;
        Session session;
        uint256 fee;
        bool users_certification;
        bool doctors_certification;
    }

    struct session_record {
        uint256 appointment_id;
        bool is_booked;
        appointmentStatus status;
        address patient_address;
    }

    address public usdt;
    address public admin;
    uint256 public total_doctors = 0;
    uint256 public total_users = 0;
    uint256 public total_appointment = 0;
    uint256 public accumulated_fees = 0;
    uint256 public pending_doctor_charge = 0;

    // mapping (address => uint256) public user_id;
    // mapping (address => uint256) public doctor_id;
    mapping (uint256 => address) public doctor_id_owner;
    mapping (uint256 => address) public user_id_owner;
    mapping (address => bool) public is_doctor;
    mapping (address => bool) public is_user;
    mapping (address => User) public user_details;
    mapping (address => Doctor) public doctor_details;
    mapping (uint256 => Appointment) public appointment_info;
    mapping (address => uint256[]) public doctors_appointments;
    mapping (address => uint256[]) public patients_appointments;
    mapping (address doctors_address => mapping (uint256 => mapping (uint256 => mapping (uint256 => mapping (Session => session_record))))) doctors_schedules;

    uint256[] public all_doctors;
    uint256[] public all_users;


    modifier onlyOwner() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor(address usdt_address) {
        admin = msg.sender;
        usdt = usdt_address;
    }

    event PaymentConfirmed(address from, address to, uint256 amount);
    event DepositConfirmed(address user_address, uint256 user_id, uint256 amount);
    event WithdrawalSuccessful(address user_address, uint256 amount);
    event AppointmentBooked(address doctor, address patient, uint256 year, uint256 month, uint256 day, Session session);
    event UserRegistered(address user_address, uint256 user_id);
    event SessionCanceled(address user_address, uint256 session_id);
    event DoctorRegistered(address doctor_address, uint256 doctor_id);
    event session_accepted(uint256 appointment_id);
    event session_marked_complete(uint256 appointment_id, address usersaddress);

    function deposit(address user_address, uint256 amount) public {
        uint256 id;

        if (is_user[msg.sender]) {
            user_deposit(amount);
            id = user_details[msg.sender].user_id;
        }

        if (is_doctor[msg.sender]) {
            doctor_deposit(amount);
            id = doctor_details[msg.sender].doctor_id;
        }

        emit DepositConfirmed(user_address, id, amount);
    }

    function user_deposit( uint256 amount) internal {
        uint256 _user_id = user_details[msg.sender].user_id;
        user_details[msg.sender].balance += amount;

        IERC20(usdt).transferFrom(msg.sender, address(this), amount);
    }

    function doctor_deposit(uint256 amount) internal {

        uint256 _doctor_id = doctor_details[msg.sender].doctor_id;
        doctor_details[msg.sender].balance += amount;

        IERC20(usdt).transferFrom(msg.sender, address(this), amount);

    }

    // charge 0.02% for doctor withdrawal
    function withdraw(uint256 amount) public {
        if (is_user[msg.sender]) {
            user_withdrawal(amount);
        } else if (is_doctor[msg.sender]) {
            doctor_withdrawal(amount);
        }else if (msg.sender == admin) {
            admin_withdrawal(amount);
        }
        emit WithdrawalSuccessful(msg.sender, amount);
    }

    function user_withdrawal(uint256 amount) internal {
        uint256 _user_id = user_details[msg.sender].user_id;
        require(amount <= user_details[msg.sender].balance, "Cant withdraw more than your balance");
        user_details[msg.sender].balance -= amount;

        IERC20(usdt).transfer(msg.sender, amount);
    }

    function doctor_withdrawal(uint256 amount) internal {
        uint256 _doctor_id = doctor_details[msg.sender].doctor_id;
        require(amount <= doctor_details[msg.sender].balance, "Cant withdraw more than your balance");
        doctor_details[msg.sender].balance -= amount;
        uint256 fees = (2  * amount) / 100;
        accumulated_fees += fees;

        IERC20(usdt).transfer(msg.sender, amount - fees);

    }

    function admin_withdrawal(uint256 amount) internal onlyOwner {
        require(amount <= accumulated_fees, "Cant withdraw more than is availiable");
        accumulated_fees -= amount;

        IERC20(usdt).transfer(msg.sender, amount);

    }

    function register_user(string memory name,  string memory image_url, string memory gender, string memory occupation) public returns(uint256) {
        User memory _user;

        total_users += 1;
        is_user[msg.sender] = true;

        _user.user_address = msg.sender;
        _user.image_url = image_url;
        _user.name = name;
        _user.balance = 0;
        _user.user_id = total_users;
        _user.gender = gender;
        _user.occupation = occupation;
        _user.user_id = total_users;

        user_details[msg.sender] = _user;
        user_id_owner[total_users] = msg.sender;
        all_users.push(total_users);

        emit UserRegistered(msg.sender, total_users);
        return total_users;
    }

    function register_doctor(string memory name, string memory gender, string memory specialty, address doctor_address, uint256 charge_per_hour, string memory image_url) public onlyOwner {
        Doctor memory _doctor;

        total_doctors += 1;
        is_doctor[doctor_address] = true;

        _doctor.name = name;
        _doctor.doctor_id = total_doctors;
        _doctor.doctor_address = doctor_address;
        _doctor.image_url = image_url;
        _doctor.gender = gender;
        _doctor.charge_per_hour = charge_per_hour;
        _doctor.specialty = specialty;
        _doctor.balance = 0;

        doctor_id_owner[total_doctors] = doctor_address;
        doctor_details[doctor_address] = _doctor;
        all_doctors.push(total_doctors);

        emit DoctorRegistered(doctor_address, total_doctors);
    }

    function book_appointment(address doctor_address, uint256 year, uint256 month, uint256 day, Session session) public {
        Doctor memory _doctor_details = get_doctor_details(doctor_address);
        session_record memory session_details = doctors_schedules[doctor_address][year][month][day][session];
        require(session_details.is_booked == false, 'Session already booked please chose another');
        total_appointment += 1;
        Appointment memory new_appointment = Appointment ({
            appointment_id: total_appointment,
            doctor: doctor_address,
            patient: msg.sender,
            Year: year,
            Month: month,
            Day: day,
            session: session,
            fee: _doctor_details.charge_per_hour,
            users_certification: false,
            doctors_certification: false
        });

        session_record memory new_session = session_record ({
            appointment_id: total_appointment,
            is_booked: true,
            status: appointmentStatus.awaiting_confirmation,
            patient_address: msg.sender
        });

        appointment_info[total_appointment] = new_appointment;
        doctors_appointments[doctor_address].push(total_appointment);
        patients_appointments[msg.sender].push(total_appointment);
        doctors_schedules[doctor_address][year][month][day][session] = new_session;
        pending_doctor_charge += _doctor_details.charge_per_hour;
        IERC20(usdt).transferFrom(msg.sender, address(this), _doctor_details.charge_per_hour);

        emit AppointmentBooked(doctor_address, msg.sender, year, month, day, session);
    }

    function accept_session (uint256 appointment_id) public {
        require(appointment_info[appointment_id].doctor == msg.sender, 'Not incharge on this aooiubtnebt');
        address doctor = appointment_info[appointment_id].doctor;
        doctors_schedules[doctor][appointment_info[appointment_id].Year][appointment_info[appointment_id].Month][appointment_info[appointment_id].Day][appointment_info[appointment_id].session].status = appointmentStatus.confirmed;
        emit session_accepted(appointment_id);
    }

    function session_completed (uint256 appointment_id) public {
        require(msg.sender == appointment_info[appointment_id].doctor || msg.sender == appointment_info[appointment_id].patient, 'Caller not authorized');
        if (msg.sender == appointment_info[appointment_id].doctor) {
            appointment_info[appointment_id].doctors_certification = true;
        } else if (msg.sender == appointment_info[appointment_id].patient) {
            appointment_info[appointment_id].users_certification = true;
        }

        if (appointment_info[appointment_id].users_certification && appointment_info[appointment_id].users_certification) {
            doctor_details[appointment_info[appointment_id].doctor].balance +=   appointment_info[appointment_id].fee;
        }

        emit session_marked_complete(appointment_id, msg.sender);
    }

    function get_doctor_details(address doctor_address) public view returns(Doctor memory) {
        return doctor_details[doctor_address];
    }

    function get_user_details(address user_address) public view returns(User memory) {
        return user_details[user_address];
    }

    function cancel_appointment(uint256 appointment_id) public {
        require(appointment_info[appointment_id].patient  == msg.sender, 'sorry You are not the patient');
        address doctor = appointment_info[appointment_id].doctor;
        session_record memory _new_record = doctors_schedules[doctor][appointment_info[appointment_id].Year][appointment_info[appointment_id].Month][appointment_info[appointment_id].Day][appointment_info[appointment_id].session];

        doctors_schedules[doctor][appointment_info[appointment_id].Year][appointment_info[appointment_id].Month][appointment_info[appointment_id].Day][appointment_info[appointment_id].session] = session_record ({
            appointment_id: appointment_id,
            status: appointmentStatus.free,
            is_booked: false,
            patient_address: address(0)
        });

        pending_doctor_charge -= appointment_info[appointment_id].fee;
        user_details[appointment_info[appointment_id].patient].balance += appointment_info[appointment_id].fee;


        appointment_info[appointment_id] = Appointment ({
            appointment_id: appointment_id,
            doctor: doctor,
            patient: address(0),
            Year: 0,
            Month: 0,
            Day: 0,
            session: Session.not_selected,
            fee: 0,
            users_certification: false,
            doctors_certification: false
        });

        //delete from a users and doctors array
        emit SessionCanceled(msg.sender, appointment_id);
    }


    function get_all_doctors() public view returns(address[] memory) {
        address[] memory  _all_doctors = new address[](total_doctors);
        
        for (uint256 i = 1; i <= total_doctors; i++) {
            _all_doctors[i] = doctor_id_owner[i];
        }

        return _all_doctors;
    }

    function get_all_users() public view returns(address[] memory) {
        address[] memory _all_users = new address[](total_users);

        for (uint256 i = 1; i < total_users; i++) {
            _all_users[i] = user_id_owner[i];
        }

        return _all_users;
    }

    function get_user_id(address user_address) public view returns(uint256) {
        uint256 _user_id = user_details[user_address].user_id;
        return _user_id;
    }

    function get_doctor_id(address doctor_address) public view returns(uint256) {
        uint256 _doctor_id = doctor_details[doctor_address].doctor_id;
        return _doctor_id;
    }

    function get_doctor_appointment(address _doctor_address) public view returns(uint256[] memory) {
        uint256[] memory _appointments = doctors_appointments[_doctor_address];
        return _appointments;
    }

    function get_user_appointment(address _user_address) public view returns(uint256[] memory) {
        uint256[] memory _appointments = patients_appointments[_user_address];
        return _appointments;
    }

    function get_appointment_details(uint256 _appointment_id) public view returns(Appointment memory) {
        return appointment_info[_appointment_id];
    }

    function check_doctor_schedules(address doctor_address, uint256 year, uint256 month, uint256 day, Session session) public view returns (session_record memory) {
        return doctors_schedules[doctor_address][year][month][day][session];
    }

    function get_user_balance(address _user_address) public view returns(uint256) {

        uint256 balance;

        if (is_user[_user_address]) {
            balance = get_patient_balance(_user_address);
        }

        if (is_doctor[_user_address]) {
            balance = get_doctor_balance(_user_address);
        }

        return balance;
    }
    function get_doctor_balance(address _doctor_address) internal view returns(uint256) {
        Doctor memory _doctor_details = doctor_details[_doctor_address];
        return _doctor_details.balance;
    }

    function get_patient_balance(address _user_address) internal view returns(uint256) {
        User memory _user_details = user_details[_user_address];
        return _user_details.balance;
    }

    function check_is_doctor(address _user_address) public view returns(bool) {
        bool val = is_doctor[_user_address];
        return val;
    }

    function check_is_user(address _user_address) public view returns(bool) {
        bool val = is_user[_user_address];
        return val;
    }


}
