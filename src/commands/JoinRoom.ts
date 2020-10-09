import { Command } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { UserAddedToRoom } from '../events/UserAddedToRoom'

@Command({
  authorize: 'all',
})
export class JoinRoom {
  public constructor(readonly username: string, readonly roomID: string) {}

  public static async handle(command: JoinRoom, register: Register): Promise<void> {
    register.events(new UserAddedToRoom(command.username, command.roomID))
  }
}
