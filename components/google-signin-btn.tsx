import { supabase } from "@/libs/supabase";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID!;

export default function GoogleSigninBtn() {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();

          // Send the ID token to Supabase
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.data?.idToken!,
          });

          if (error) {
            console.error("Supabase login error:", error);
          } else {
            console.log("Supabase login success:", data);
          }

          return { data, error };
        } catch (err: any) {
          console.error("Google Signin error:", err);
        }
      }}
    />
  );
}
