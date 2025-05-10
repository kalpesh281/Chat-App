import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

function OtherUsers() {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.auth);

  if (!otherUsers) return;

  return (
    <div className="h-96 overflow-y-auto ">
      {otherUsers?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
}

export default OtherUsers;
