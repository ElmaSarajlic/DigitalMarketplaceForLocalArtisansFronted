import { useMutation } from "react-query";
import { ArtworkService } from "../services";

interface ApiError {
    message: string;
}  

const useDeleteArtwork = () => {
    return useMutation<void, ApiError, string>(
        (id: string) => ArtworkService.deleteArtwork(id)
    );
};

export default useDeleteArtwork;