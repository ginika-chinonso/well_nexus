import {doctors} from '@db/doctors';
import Avatar from '@ui/Avatar';

export const depsOptions = [
    {value: 'all', label: 'All Departments'},
    {value: 'family', label: 'Family Doctors'},
    {value: 'therapy', label: 'Therapists'},
    {value: 'dent', label: 'Dentists'},
    {value: 'cardio', label: 'Cardiologists'},
]

export const doctorsOptions = () => {
    let options = [];
    doctors.forEach(doctor => {
        options.push({
            value: doctor.id,
            label: <div className="user-option">
                <Avatar avatar={doctor.avatar} alt={doctor.name} size={40} />
                <span>{doctor.name}</span>
            </div>
        });
    });
    return options;
}