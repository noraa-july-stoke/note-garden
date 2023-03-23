//==============================================================
//       ___     __  ___ __     ___        _____ __      __
//  |__||__ |   |__)|__ |__)   |__|  ||\ |/  `||/  \|\ |/__`
//  |  ||___|___|   |___|  \   |  \__/| \|\__,||\__/| \|.__/
//   _____  __     __  __  _____        __  __  ___
//  |__/  \|__)   |__)/  \/__`|    |\/|/  \|  \|__ |
//  |  \__/|  \   |   \__/.__/|    |  |\__/|__/|___|___
//==============================================================
// Turns post into something more manageable, and intuitive to
// work with. reassigns, organizes,deletes some keys/value pairs
//==============================================================

function postFixup(post) {
  post.content = {};
  switch (post.noteType) {
    case "TEXT":
      post.content.note = post.TextNote?.note;
    case "IMAGE":
      post.content.url = post.ImageNote?.url;
    case "LINK":
      post.content.link = post.Link?.url;
    case "COLLECTION":
      post.content.collection = post.Collection?.collection;
    case "AUDIO":
      post.content.audio = post.AudioNote?.url;
    case "VIDEO":
      post.content.video = post.VideoNote?.url;
    default:
      break;
  }
  const authorInfo = post.User;
  post.authorInfo = authorInfo;
  delete post.User;
  delete post.ImageNote;
  delete post.TextNote;
  return post;
}

module.exports = { postFixup };
