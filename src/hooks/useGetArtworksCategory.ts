import { useQuery } from 'react-query';
import { Artwork } from '../utils/types';
import { ArtworkService } from '../services';

interface ApiError {
    message: string;
}

const useGetAdsBySubcategory = (categoryName: string) => {
    return useQuery<Artwork[], ApiError>(
        ['artworksBySubcategory', categoryName], 
        () => ArtworkService.getArtworksByCategory(categoryName),
    );
};
export default useGetAdsBySubcategory;
