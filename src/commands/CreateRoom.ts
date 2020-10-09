import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { RoomCreated } from '../events/RoomCreated'

@Command({
  authorize: 'all',
})
export class CreateRoom {
  public constructor(readonly name: string) {}

  public static async handle(command: CreateRoom, register: Register): Promise<void> {
    register.events(new RoomCreated(command.name, UUID.generate()))
  }
}
