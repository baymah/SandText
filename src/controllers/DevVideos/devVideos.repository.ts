import { injectable } from 'inversify';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Dev_Videos } from '../../infra/database/typeorm/entity/dev_videos';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class DevVideosRepository extends GenericRepositoryImp<Dev_Videos> {

    constructor() {
        super(getRepository(Dev_Videos));
    }

    async updateVideos(video_id: string, video_details: any): Promise<any>{
        try {
            const updatedData = await createQueryBuilder("Dev_Videos")
                .update<Dev_Videos>(Dev_Videos, { ...video_details })
                .where("dev_videos.id = :id", { id: video_id })
                // .returning("*") // returns all the column values
                .updateEntity(true)
                .execute();
          return updatedData.raw[0];
        } catch (error) {
            console.log(error, "error")
            Promise.reject("Error occured while updating video.")
        }
    }
}