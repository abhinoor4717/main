import { create } from "zustand";

interface CreatePlayListModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useCreatePlayListModal = create<CreatePlayListModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen:false}),
}));

export default useCreatePlayListModal;