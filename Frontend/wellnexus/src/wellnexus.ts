import {
  AppointmentBooked as AppointmentBookedEvent,
  DepositConfirmed as DepositConfirmedEvent,
  DoctorRegistered as DoctorRegisteredEvent,
  PaymentConfirmed as PaymentConfirmedEvent,
  SessionCanceled as SessionCanceledEvent,
  UserRegistered as UserRegisteredEvent,
  WithdrawalSuccessful as WithdrawalSuccessfulEvent,
  session_accepted as session_acceptedEvent,
  session_marked_complete as session_marked_completeEvent
} from "../generated/wellnexus/wellnexus"
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
} from "../generated/schema"

export function handleAppointmentBooked(event: AppointmentBookedEvent): void {
  let entity = new AppointmentBooked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.doctor = event.params.doctor
  entity.patient = event.params.patient
  entity.year = event.params.year
  entity.month = event.params.month
  entity.day = event.params.day
  entity.session = event.params.session

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDepositConfirmed(event: DepositConfirmedEvent): void {
  let entity = new DepositConfirmed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user_address = event.params.user_address
  entity.user_id = event.params.user_id
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDoctorRegistered(event: DoctorRegisteredEvent): void {
  let entity = new DoctorRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.doctor_address = event.params.doctor_address
  entity.doctor_id = event.params.doctor_id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentConfirmed(event: PaymentConfirmedEvent): void {
  let entity = new PaymentConfirmed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSessionCanceled(event: SessionCanceledEvent): void {
  let entity = new SessionCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user_address = event.params.user_address
  entity.session_id = event.params.session_id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = new UserRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user_address = event.params.user_address
  entity.user_id = event.params.user_id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawalSuccessful(
  event: WithdrawalSuccessfulEvent
): void {
  let entity = new WithdrawalSuccessful(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user_address = event.params.user_address
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlesession_accepted(event: session_acceptedEvent): void {
  let entity = new session_accepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.appointment_id = event.params.appointment_id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlesession_marked_complete(
  event: session_marked_completeEvent
): void {
  let entity = new session_marked_complete(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.appointment_id = event.params.appointment_id
  entity.usersaddress = event.params.usersaddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
