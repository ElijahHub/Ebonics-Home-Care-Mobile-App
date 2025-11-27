import { Tabs } from "expo-router";
import { Calendar, Home, MessageSquare, Settings } from "lucide-react-native";

export default function TabLayout() {
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       const {
  //         data: { session },
  //       } = await supabase.auth.getSession();

  //       if (!session) {
  //         router.replace("/login"); // redirect if not logged in
  //       }

  //       setLoading(false);
  //     };

  //     checkAuth();
  //   }, []);

  //   if (loading) return null; // you can add a splash loader if you want

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarShowLabel: false, // ⛔ hides titles
        tabBarStyle: {
          height: 80,
          paddingBottom: 20, // keeps icons above nav bar
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MessageSquare size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}
