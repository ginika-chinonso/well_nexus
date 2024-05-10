import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AppointmentBooked,
  DepositConfirmed,
  DoctorRegistered,
  PaymentConfirmed,
  SessionCanceled,
  UserRegistered,
  WithdrawalSuccessful,
  session_accepted,
  session_marked_complete
} from "../generated/WellNexus/WellNexus"

export function createAppointmentBookedEvent(
  doctor: Address,
  patient: Address,
  year: BigInt,
  month: BigInt,
  day: BigInt,
  session: i32
): AppointmentBooked {
  let appointmentBookedEvent = changetype<AppointmentBooked>(newMockEvent())

  appointmentBookedEvent.parameters = new Array()

  appointmentBookedEvent.parameters.push(
    new ethereum.EventParam("doctor", ethereum.Value.fromAddress(doctor))
  )
  appointmentBookedEvent.parameters.push(
    new ethereum.EventParam("patient", ethereum.Value.fromAddress(patient))
  )
  appointmentBookedEvent.parameters.push(
    new ethereum.EventParam("year", ethereum.Value.fromUnsignedBigInt(year))
  )
  appointmentBookedEvent.parameters.push(
    new ethereum.EventParam("month", ethereum.Value.fromUnsignedBigInt(month))
  )
  appointmentBookedEvent.parameters.push(
    new ethereum.EventParam("day", ethereum.Value.fromUnsignedBigInt(day))
  )
  appointmentBookedEvent.parameters.push(
    new ethereum.EventParam(
      "session",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(session))
    )
  )

  return appointmentBookedEvent
}

export function createDepositConfirmedEvent(
  user_address: Address,
  user_id: BigInt,
  amount: BigInt
): DepositConfirmed {
  let depositConfirmedEvent = changetype<DepositConfirmed>(newMockEvent())

  depositConfirmedEvent.parameters = new Array()

  depositConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "user_address",
      ethereum.Value.fromAddress(user_address)
    )
  )
  depositConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "user_id",
      ethereum.Value.fromUnsignedBigInt(user_id)
    )
  )
  depositConfirmedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositConfirmedEvent
}

export function createDoctorRegisteredEvent(
  doctor_address: Address,
  doctor_id: BigInt
): DoctorRegistered {
  let doctorRegisteredEvent = changetype<DoctorRegistered>(newMockEvent())

  doctorRegisteredEvent.parameters = new Array()

  doctorRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "doctor_address",
      ethereum.Value.fromAddress(doctor_address)
    )
  )
  doctorRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "doctor_id",
      ethereum.Value.fromUnsignedBigInt(doctor_id)
    )
  )

  return doctorRegisteredEvent
}

export function createPaymentConfirmedEvent(
  from: Address,
  to: Address,
  amount: BigInt
): PaymentConfirmed {
  let paymentConfirmedEvent = changetype<PaymentConfirmed>(newMockEvent())

  paymentConfirmedEvent.parameters = new Array()

  paymentConfirmedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  paymentConfirmedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  paymentConfirmedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return paymentConfirmedEvent
}

export function createSessionCanceledEvent(
  user_address: Address,
  session_id: BigInt
): SessionCanceled {
  let sessionCanceledEvent = changetype<SessionCanceled>(newMockEvent())

  sessionCanceledEvent.parameters = new Array()

  sessionCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "user_address",
      ethereum.Value.fromAddress(user_address)
    )
  )
  sessionCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "session_id",
      ethereum.Value.fromUnsignedBigInt(session_id)
    )
  )

  return sessionCanceledEvent
}

export function createUserRegisteredEvent(
  user_address: Address,
  user_id: BigInt
): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "user_address",
      ethereum.Value.fromAddress(user_address)
    )
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "user_id",
      ethereum.Value.fromUnsignedBigInt(user_id)
    )
  )

  return userRegisteredEvent
}

export function createWithdrawalSuccessfulEvent(
  user_address: Address,
  amount: BigInt
): WithdrawalSuccessful {
  let withdrawalSuccessfulEvent = changetype<WithdrawalSuccessful>(
    newMockEvent()
  )

  withdrawalSuccessfulEvent.parameters = new Array()

  withdrawalSuccessfulEvent.parameters.push(
    new ethereum.EventParam(
      "user_address",
      ethereum.Value.fromAddress(user_address)
    )
  )
  withdrawalSuccessfulEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawalSuccessfulEvent
}

export function createsession_acceptedEvent(
  appointment_id: BigInt
): session_accepted {
  let sessionAcceptedEvent = changetype<session_accepted>(newMockEvent())

  sessionAcceptedEvent.parameters = new Array()

  sessionAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "appointment_id",
      ethereum.Value.fromUnsignedBigInt(appointment_id)
    )
  )

  return sessionAcceptedEvent
}

export function createsession_marked_completeEvent(
  appointment_id: BigInt,
  usersaddress: Address
): session_marked_complete {
  let sessionMarkedCompleteEvent = changetype<session_marked_complete>(
    newMockEvent()
  )

  sessionMarkedCompleteEvent.parameters = new Array()

  sessionMarkedCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "appointment_id",
      ethereum.Value.fromUnsignedBigInt(appointment_id)
    )
  )
  sessionMarkedCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "usersaddress",
      ethereum.Value.fromAddress(usersaddress)
    )
  )

  return sessionMarkedCompleteEvent
}
