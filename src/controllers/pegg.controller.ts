import { Request, Response } from 'express';
import { createPegg, getPegsByVideoId } from '../services/pegg.service';
// import { dbConnection } from '../infra/database/typeorm/db.connection'

const list = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    // const peggs = await dbConnection.getConnection().query('select * from PEGGS')
    const peggs = await getPegsByVideoId(videoId);
    return res.status(200).json({
      message: 'Pegg fetched successfully',
      success: true,
      data: peggs,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    // const peggs = await dbConnection.getConnection().query('select * from PEGGS')
    // return res.status(200).json({
    //     message: 'Pegg fetched successfully',
    //     success: true,
    //     data: peggs,
    // })
    const {
      productId,
      videoId,
      label,
      confidence,
      boundingBoxHeight,
      boundingBoxWidth,
      boundingBoxTop,
      boundingBoxLeft,
      millisecond,
    } = req.body;

    //check if the video and product exist in the database...

    const createResult = await createPegg({
      product_id: productId,
      video_id: videoId,
      label,
      confidence,
      boundingBoxHeight,
      boundingBoxWidth,
      boundingBoxTop,
      boundingBoxLeft,
      millisecond,
    });
    console.log(createResult, 'Brand');
    return res.status(200).json({ success: true, message: 'Create Response...' });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
export { list, create };
