let people = [
    {
      name: "Alice",
      address: {
        city: "New York",
        street: {
          name: "Broadway",
          number: 123,
        },
      },
    },
    {
      name: "Bob",
      address: {
        city: "Los Angeles",
        street: {
          name: "Sunset Boulevard",
          number: 456,
        },
      },
    },
  ];
  
  let bag = people.map(({ name, address: { city, street: { name: street} } }) => {
    return `${name} lives in ${city} on ${street}`
  })
  
  console.log(bag)