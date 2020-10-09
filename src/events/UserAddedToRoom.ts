import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'

@Event
export class UserAddedToRoom {
  public constructor(readonly username: string, readonly roomID: string) {}

  public entityID(): UUID {
    return this.roomID
  }
}
