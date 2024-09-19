import { useQuery } from 'react-query';
import { Artwork } from '../utils/types';
import { ArtworkService } from '../services';

interface ApiError {
    message: string;
}

const useGetComments = (artworkId: string) => {
    return useQuery<Artwork[], ApiError>(
        ['getCommentsForArtwork', artworkId], 
        () => ArtworkService.getArtworksByCategory(artworkId),
    );
};
export default useGetComments;
