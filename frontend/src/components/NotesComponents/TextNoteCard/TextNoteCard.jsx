import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TextNoteCard = ({ note }) => {

    return (
        <div dangerouslySetInnerHTML={{ __html: note?.note }} />
    );
};
export default TextNoteCard;
