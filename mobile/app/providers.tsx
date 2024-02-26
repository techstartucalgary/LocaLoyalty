import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { RootSiblingParent } from 'react-native-root-siblings';


export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <RootSiblingParent>{/* <- use RootSiblingParent to wrap your root component */}
        {children}
      </RootSiblingParent>
    </QueryClientProvider>
  );
}
