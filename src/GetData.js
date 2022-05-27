const GetData = async () => {
  let response = await fetch("https://gutendex.com/books?page=2", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let r = await response.json();
  console.log(r);
  return r;
  // if (response) {
  //   const reader = response.body.getReader();
  //   return new ReadableStream({
  //     start(controller) {
  //       return pump();
  //       function pump() {
  //         return reader.read().then(({ done, value }) => {
  //           // When no more data needs to be consumed, close the stream
  //           if (done) {
  //             controller.close();
  //             return;
  //           }
  //           // Enqueue the next data chunk into our target stream
  //           console.log(done, value);
  //           controller.enqueue(value);
  //           return pump();
  //         });
  //       }
  //     },
  //   })
  //     .then((stream) => new Response(stream))
  //     .then((response) => response.blob())
  //     .then((blob) => Object.create(blob))
  //     .then((obj) => console.log(obj));
  // }
};
const onChangeSearch = async (author, fraze) => {
  let response = await fetch(
    `https://gutendex.com/books?search=${author}%20${fraze}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  let r = await response.json();
  console.log(r);
  return r;
};
const Sorter = async (type) => {
  let response = await fetch(`https://gutendex.com/books?sort=${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let r = await response.json();
  console.log(r);
  return r;
};
const Filter = async (fraze) => {
  let response = await fetch(`https://gutendex.com/books?topic=${fraze}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let r = await response.json();
  console.log(r);
  return r;
};
export { onChangeSearch, Sorter, Filter };
export default GetData;
