import { Playlist } from "@/types";
import Image from "next/image";
import React from "react";

interface PlaylistItemProps {
    playlist: Playlist
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({playlist}) => {

    const handleClick = () => {
        
    }

    return (
        <div onClick={() => {}} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] over-hidden">
                <Image fill src="/images/defaultPlaylistImage.png" alt="Playlist item"/>
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{playlist.name}</p>
                <p className="text-neutral-400 text-sm truncate">
                    Playlist
                </p>
            </div>
        </div>
    )
 }

 export default PlaylistItem;