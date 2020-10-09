import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { RoomCreated } from '../events/RoomCreated'
import { UserAddedToRoom } from '../events/UserAddedToRoom'

@Entity
export class Room {
  public constructor(public id: UUID, readonly name: string, readonly participants: Array<string>) {}

  @Reduces(RoomCreated)
  public static reduceRoomCreated(event: RoomCreated, currentRoom?: Room): Room {
    if (currentRoom) {
      throw `The impossible happened: Room with id ${event.roomID} is already created`
    }
    return new Room(event.roomID, event.name, [])
  }

  @Reduces(UserAddedToRoom)
  public static reduceUserAddedToRoom(event: UserAddedToRoom, currentRoom?: Room): Room {
    if (!currentRoom) {
      throw `Room with id ${event.roomID} doesn't exist`
    }
    currentRoom.participants.push(event.username)
    return new Room(currentRoom.id, currentRoom.name, currentRoom.participants)
  }
}
