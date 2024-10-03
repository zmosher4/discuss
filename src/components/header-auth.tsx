'use client';

import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import * as actions from '@/actions';
import { signOut as nextAuthSignOut } from 'next-auth/react';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <Button
              onClick={async () => {
                await actions.signOut(); // Your custom sign-out logic
                await nextAuthSignOut({ redirect: false }); // NextAuth sign-out, prevents full redirect
              }}
            >
              Sign Out{' '}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form
            action={async () => {
              await actions.signOut();
              await nextAuthSignOut({ redirect: false });
            }}
          >
            <Button type="submit" color="primary" variant="flat">
              Sign Out
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }
  return authContent;
}
