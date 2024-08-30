import { Button } from "@/components/ui/button";

interface UserSelectedDisplayProps {
    username: string;
    id: string;
}

const UserSelectedDisplay: React.FC<UserSelectedDisplayProps> = ({ username, id }) => {
    function deleteSelf(event: React.MouseEvent<HTMLButtonElement>) {
        const parentDiv = event.currentTarget.parentNode as HTMLElement;
        const selectButton = document.getElementById("button-id-" + username) as HTMLElement;
        selectButton.textContent = "Select";
        parentDiv.remove();
    }

    return (
        <div className="rounded-md border border-slate-500 px-1 py-0 bg-slate-300 space-x-2 flex items-center justify-center m-0.5" id={id}>
            <p>{username}</p>
            <Button variant="ghost" className="w-[20px] h-[20px] text-xs" size="icon" onClick={deleteSelf}>X</Button>
        </div>
    );
};

export default UserSelectedDisplay;
