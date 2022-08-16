'use strict';

import { Request, Response, NextFunction } from 'express';
import UserActivitiesServices from '../services/UserActivitiesService';
import { HttpResponse } from '../utils/ResponseType';

// import AcademyTestRequestDTO from "App/DTO/AcademyTest/AcademyTestRequestDTO";
// import AcademyTestUpdateDTO from "App/DTO/AcademyTest/AcademyTestUpdateDTO";
// import IAcademyTestService from "App/Service/AcademyTestService/IAcademyTestService";
// import { Request, Response, NextFunction } from "Elucidate/HttpContext";
// import HttpResponse from "Elucidate/HttpContext/ResponseType";
// import AcademyTestValidation from "../Requests/AcademyTestValidation";

class UserActivitiesController {
    constructor(protected UserActivitiesService: UserActivitiesServices) {}
    //     /**
    //      * Store a newly created resource in storage.
    //      * @method POST
    //      * @endpoint /user_activities/save
    //      * @param Request
    //      * @return Response
    //      */
    store = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            console.log('USer activities reques got here');
            console.log(req.headers.portal, 'PORTAL NAME');
            let data = req.body;
            console.log(data, "userData...");
            return new UserActivitiesServices()
                .create(data)
                .then((result: any) => {
                    return HttpResponse.OK(res, { data: result, status: true });
                })
                .catch((error: any) => {
                    return HttpResponse.CATCH_BAD_REQUEST(res, { data: error, status: false });
                });
        } catch (error: any) {
            return res.status(400).json({ success: false, error: error.message });
        }
    };
}

// export { store };
export default UserActivitiesController;
