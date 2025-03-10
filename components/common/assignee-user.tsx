'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, users } from '@/lib/mock-data/users';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckIcon, CircleUserRound, Send, UserIcon } from 'lucide-react';
import { useState } from 'react';

const color = {
   online: '#00cc66',
   offline: '#969696',
   away: '#ffcc00',
};

interface AssigneeUserProps {
   user: User | null;
}

export function AssigneeUser({ user }: AssigneeUserProps) {
   const [open, setOpen] = useState(false);
   const [currentAssignee, setCurrentAssignee] = useState<User | null>(user);
   return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
         <DropdownMenuTrigger asChild>
            <button className="relative w-fit focus:outline-none">
               <Avatar className="size-6 shrink-0">
                  {currentAssignee ? (
                     <>
                        <AvatarImage src={currentAssignee.avatarUrl} alt={currentAssignee.name} />
                        <AvatarFallback>{currentAssignee.name[0]}</AvatarFallback>
                     </>
                  ) : (
                     <>
                        <AvatarFallback className="bg-transparent">
                           <CircleUserRound className="size-5 text-zinc-600" />
                        </AvatarFallback>
                     </>
                  )}
               </Avatar>
               {currentAssignee && (
                  <span
                     className={`border-background absolute -end-0.5 -bottom-0.5 size-2.5 rounded-full border-2`}
                     style={{ backgroundColor: color[currentAssignee.status] }}
                  >
                     <span className="sr-only">{currentAssignee.status}</span>
                  </span>
               )}
            </button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="start" className="w-[206px]">
            <DropdownMenuLabel>Assign to...</DropdownMenuLabel>
            <DropdownMenuItem
               onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAssignee(null);
                  setOpen(false);
               }}
            >
               <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  <span>No assignee</span>
               </div>
               {!currentAssignee && <CheckIcon className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {users.map((user) => (
               <DropdownMenuItem
                  key={user.id}
                  onClick={(e) => {
                     e.stopPropagation();
                     setCurrentAssignee(user);
                     setOpen(false);
                  }}
               >
                  <div className="flex items-center gap-2">
                     <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                     </Avatar>
                     <span>{user.name}</span>
                  </div>
                  {currentAssignee?.id === user.id && <CheckIcon className="ml-auto h-4 w-4" />}
               </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>New user</DropdownMenuLabel>
            <DropdownMenuItem>
               <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>Invite and assign...</span>
               </div>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
