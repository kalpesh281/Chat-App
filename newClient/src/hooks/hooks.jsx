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

export { useErrors, useAsyncMutation };
