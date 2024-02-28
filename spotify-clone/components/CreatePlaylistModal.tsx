"use client";

import useCreatePlayListModal from "@/hooks/useCreatePlayListModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

const CreatePlayListModal = () => {

  const [isLoading, setIsloading] = useState(false);
  const createPlaylistModal = useCreatePlayListModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

    
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      createPlaylistModal.onClose();
    }
  }

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsloading(true);

      const name = values.name;

      if (!user || /^\s*$/.test(name)) {
        toast.error('Missing fields');
        return;
      };

      // Create playlist
      const { error: supabaseError } = await supabaseClient.from("playlists").insert({
        user_id: user.id,
        name: name
      });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsloading(false);
      toast.success("Playlist created!");
      reset();
      createPlaylistModal.onClose();
      
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsloading(false);
    }
  }

    return (
        <Modal title="Create a playlist" description="" isOpen={createPlaylistModal.isOpen} onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
              <Input 
              id="name"
              disabled={isLoading}
              {...register('name', {required: true})}
              placeholder="Enter a name for your playlist"
              />
              <Button disabled={isLoading} type="submit">
                Create
              </Button>
            </form>
        </Modal>
    )
};

export default CreatePlayListModal;