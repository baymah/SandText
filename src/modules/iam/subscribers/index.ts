import { nodeMailerService } from "../../notification/services";
import { verifyUserAccount } from "../useCases/verifyUserAccount.ts";
import { AfterEmailTokenCreated } from "./afterEmailTokenCreated";
import { AfterEmailVerified } from "./afterEmailVerified";


new AfterEmailTokenCreated(nodeMailerService);
new AfterEmailVerified(verifyUserAccount)
