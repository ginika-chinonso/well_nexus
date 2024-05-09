import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AppointmentBooked } from "../generated/schema"
import { AppointmentBooked as AppointmentBookedEvent } from "../generated/wellnexus/wellnexus"
import { handleAppointmentBooked } from "../src/wellnexus"
import { createAppointmentBookedEvent } from "./wellnexus-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let doctor = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let patient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let year = BigInt.fromI32(234)
    let month = BigInt.fromI32(234)
    let day = BigInt.fromI32(234)
    let session = 123
    let newAppointmentBookedEvent = createAppointmentBookedEvent(
      doctor,
      patient,
      year,
      month,
      day,
      session
    )
    handleAppointmentBooked(newAppointmentBookedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AppointmentBooked created and stored", () => {
    assert.entityCount("AppointmentBooked", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AppointmentBooked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "doctor",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AppointmentBooked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "patient",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AppointmentBooked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "year",
      "234"
    )
    assert.fieldEquals(
      "AppointmentBooked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "month",
      "234"
    )
    assert.fieldEquals(
      "AppointmentBooked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "day",
      "234"
    )
    assert.fieldEquals(
      "AppointmentBooked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "session",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
