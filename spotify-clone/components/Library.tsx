"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Playlist, Song } from "@/types";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { WiCloudUp } from "react-icons/wi";
import useCreatePlayListModal from "@/hooks/useCreatePlayListModal";
import { IoIosAlbums } from "react-icons/io";
import Box from "./Box";
import PlaylistItem from "./PlaylistItem";

interface LibraryProps {
    songs: Song[];
    playlists: Playlist[];
}

const Library: React.FC<LibraryProps> = ({songs, playlists}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const createPlaylistModal = useCreatePlayListModal();
    const { user } = useUser();
    const onPlay = useOnPlay(songs);

    const onClick = (action: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        if (action == "createPlaylist") {
            return createPlaylistModal.onOpen();
        }

        if (action == "uploadSong") {
            return uploadModal.onOpen();
        }

        // TODO: Check for subscription

        
    };

    return (
        <div className="flex flex-col library">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <IoIosAlbums className="text-neutral-400" size={26}/>
                    <p className="text-neutral-400 font-medium text-md">Playlists</p>
                </div>
                <div>
                    <AiOutlinePlus 
                        onClick={() => onClick("createPlaylist")}
                        size={25}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3 max-h-[140px] overflow-y-auto">
                {playlists.map((playlist) => (
                    <PlaylistItem playlist={playlist} key={playlist.id} />
                ))}
            </div>
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26}/>
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
                <div>
                    <WiCloudUp 
                        onClick={() => onClick("uploadSong")}
                        size={32}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem onClick={(id: string) => onPlay(id)} key={item.id} data={item}/>
                ))}
            </div>
        </div>
    );
};

export default Library;