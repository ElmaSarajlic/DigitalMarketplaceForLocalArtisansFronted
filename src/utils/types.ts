import { SetStateAction } from "react";

export type Artwork =  {
    id: string ;
    title: string ;
    category: string;
    description: string;
    author:string;
    creationDate?: Date;
    imgUrl:string;
    price:number;
    userId : string;
    comments: Comment[];
}

export type Payment = {
  artworkIds: string[],
  customerId: string
}

export type PaymentResponse = {
  id: string
}

export type User ={
    id: string;
    username?: string;
    userType?: string;
    email?: string;
    phoneNumber?: string;
    address? : string;
    password?: string;
    imgUrl? : string;
    cartId: string;
    wishlistId: string;

}

export type Subcategory = {
    subcategories?: SetStateAction<Subcategory[]>;
    id: string;
    name: string;
  };
  
  export type Category = {
    id?: string
    name: string;
  };

  export type Password = {
    userId: any;
    oldPassword: string,
    newPassword: string
}

  export type Cart = {
    artwork: any;
    id: string;
    artworks: Artwork[];
    quantity: number;
    creationDate: Date;
    userId: string;
    totalPrice: number;
};
export type Wishlist = {
  artwork: any;
  id: string;
  artworks: Artwork[];
  quantity: number;
  creationDate: Date;
  userId: string;
  totalPrice: number;
};
export type Comment  = {
  id: string;
  userId: string;
  artworkId: string;
  text: string;
  creationDate: Date;
}

export type Message = {
  id: string;
  userId: string;
  content: string;
  title:"New user registration";
  creationDate: Date;

}