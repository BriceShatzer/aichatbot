import { Sidebar } from '@/components/sidebar'

import { ChatHistory } from '@/components/chat-history'

import { useStytchUser, useStytch } from "@stytch/nextjs";

export async function SidebarDesktop() {
  // const { user, isInitialized } = useStytchUser();
  // const stytch = useStytch();

  // if (!user.user_id) {
  //   return null
  // }

  const user = {
    user_id: 1
  };

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory userId={user.user_id} />
    </Sidebar>
  )
}
