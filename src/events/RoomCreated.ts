import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class RoomCreated {
  public constructor(readonly name: string, readonly roomID: UUID) {}

  public entityID(): UUID {
    return this.roomID
  }
}
