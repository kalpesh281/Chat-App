import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../Features/messageSlice";


const useGetMessages = () => {
  const dispatch = useDispatch();
  const selectedUserState = useSelector((state) => state.auth.selectedUser);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5003/api/v1/message/${selectedUserState?._id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setMessage(res.data))
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUserState]);
};

export default useGetMessages;
