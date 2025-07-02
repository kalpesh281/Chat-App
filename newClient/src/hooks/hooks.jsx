
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  const shownErrors = useRef(new Set());

  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      const errorId = error?.data?.message || error?.message || "unknown";
      if (isError && !shownErrors.current.has(errorId)) {
        if (fallback) {
          fallback();
        } else {
          toast.error(errorId);
        }
        shownErrors.current.add(errorId);
        // Optionally remove the error from the set after some time if you want to allow re-showing
      }

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError)
        if (fallback) {
          fallback();
        } else
          toast.error(
            error?.data?.message || error?.message || "Failed to fetch chats"
          );

    });
  }, [errors]);
};

const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating Data...");
    try {
      const res = await mutate(...args);
      if (res?.data) {
        toast.success(toastMessage || "Data updated successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res.error.data.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Mutation failed", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, data, executeMutation];
};


const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};

export { useErrors, useAsyncMutation, useSocketEvents };

