import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Room } from '../entities/Room'

@ReadModel({
  authorize: 'all',
})
export class RoomReadModel {
  public constructor(public id: UUID, readonly name: string, readonly participantsCount: number) {}

  @Projects(Room, 'id')
  public static projectRoom(entity: Room): ProjectionResult<RoomReadModel> {
    return new RoomReadModel(entity.id, entity.name, entity.participants.length)
  }
}
