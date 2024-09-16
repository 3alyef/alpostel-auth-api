// import { Login } from "./Login/Login.service";
// import { Register } from "./Register/Registrer.service";
// import { SearchByEmail } from "./SearchByEmail/SeachByEmail.service";
// import Unregister from "./Unregister/Unregister.service";
// import { validateCredentials } from "./ValidateCredentials/ValidateCredentials.service";
// import { EmailLogin } from "./EmailLogin/EmailLogin.service";
// import { TokenGenerate } from "./TokenGenerate/TokenGenerate.service";
// import { changeProfilePhoto } from "./ChangeProfilePhoto/ChangeProfilePhoto.service";
// import { SearchByCostumName } from "./SearchByCostumName/SearchByCostumName.service";
/*export { Login, Register, SearchByEmail, Unregister, validateCredentials, EmailLogin, TokenGenerate, changeProfilePhoto, SearchByCostumName };*/

import certifyUserId from "./certifyUserId/certifyUserId";
import CheckEmail from "./CheckEmail/CheckEmail.service";
import getUserAuth from "./getUserAuth/getUserAuth.service";
import GetUserIdByEmail from "./GetUserIdByEmail/GetUserIdByEmail.service";
import RegisterUser from "./RegisterUser/RegisterUser.service";
import UnregisterUser from "./UnregisterUser/UnregisterUser.service";
import verifyPassword from "./verifyPassword/verifyPassword.service";

export { getUserAuth, verifyPassword, certifyUserId, CheckEmail, RegisterUser, GetUserIdByEmail, UnregisterUser };