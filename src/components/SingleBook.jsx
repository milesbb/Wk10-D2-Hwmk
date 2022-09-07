
const SingleBook = (book) => {
    return (
        <div>
            <img src={book.img} alt="book cover" />
            <p>Title: {book.title}</p>
        </div>
    );
}

export default SingleBook