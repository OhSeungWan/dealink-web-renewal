import { Helmet } from 'react-helmet';
import React from 'react';
import { useLocation } from 'react-router-dom';
export default function HelmetMetaData(props) {
  let location = useLocation();
  let currentUrl = 'http://192.168.0.107:3000' + location.pathname;
  let quote = props.quote !== undefined ? props.quote : 'asfaf';
  let title =
    props.title !== undefined
      ? props.title
      : 'CampersTribe - World is yours to explore';
  let image =
    props.image !== undefined
      ? props.image
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmoBvNLxOeVV2QrGP_aoWv8nw2h4QwgQVbPw&usqp=CAU';
  let description =
    props.description !== undefined
      ? props.description
      : 'CampersTribe lets you experience the camping culture. We discover the hidden gems in the nearby to help you connect with nature & yourself by learning in the woods, on the riverbank under the open sky.' +
        'Trust us, its million dollars experience to ride away from city life, pitch a tent, do campfire and endless talk!' +
        'So, join us on this voyage, and explore the beauty and miracle of being yourself!';
  let hashtag = props.hashtag !== undefined ? props.hashtag : '#경매';
  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />{' '}
    </Helmet>
  );
}
