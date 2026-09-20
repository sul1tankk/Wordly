import StudyApp from './study-app';
import {getChatGPTUser,chatGPTSignInPath,chatGPTSignOutPath} from './chatgpt-auth';
export default async function Home(){
  const user=await getChatGPTUser();
  return <StudyApp signedIn={!!user} signInHref={chatGPTSignInPath('/')} signOutHref={chatGPTSignOutPath('/')}/>;
}
