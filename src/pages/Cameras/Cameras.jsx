import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';

const Cameras = () => {
  const cameras = [
    {
      id: 1,
      name: 'Nikon D850',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2018/01/20171206_185053.jpg?fit=750%2C563&ssl=1',
    },
    {
      id: 2,
      name: 'Canon EOS R5',
      description:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtDa6F1ttXSOZovY0zDVfir1lXvxensod2Hg&usqp=CAU',
    },
    {
      id: 3,
      name: 'Sony Alpha A7 III',
      description:
        'Suspendisse potenti. Vestibulum eleifend tincidunt metus, vel lacinia felis tincidunt at.',
      image:
        'https://www.ephotozine.com/articles/sony-alpha-a7-mark-iii-review-32145/images/highres-Sony-Alpha-A7-MarkIII-9-Custom_1519667610.jpg',
    },
    {
      id: 4,
      name: '5050 travelog',
      description: 'Camera Description 1',
      image:
        'https://images.squarespace-cdn.com/content/v1/545012a9e4b0988576f6b699/1624388933841-TD4VBJ6HYRUKQSRAWNBV/canon-eos-r5-rear-lcd.jpg',
    },
    {
      id: 5,
      name: 'Camera Lenses',
      description: 'Camera Description 2',
      image:
        'https://shuttermuse.com/wp-content/uploads/2020/09/ef-lenses-canon-r5-r6.jpg',
    },
    {
      id: 6,
      name: 'Fujifilm X-T4',
      description:
        'Fujifilm X-T4 is a versatile mirrorless camera with a high-resolution sensor and advanced features.',
      image: 'https://m.media-amazon.com/images/I/91L2tiLsIJL._AC_SL1500_.jpg',
    },
    {
      id: 7,
      name: 'Olympus OM-D E-M1 Mark III',
      description:
        'The Olympus OM-D E-M1 Mark III is a professional-grade mirrorless camera known for its excellent image stabilization and rugged build.',
      image:
        'https://www.panasonic.com/content/dam/pim/mi/en/DC/DC-GH5/DC-GH5/ast-1416499.jpg.pub.crop.pc.thumb.640.1200.jpg',
    },
    {
      id: 8,
      name: 'Panasonic Lumix GH5',
      description:
        'The Panasonic Lumix GH5 is a popular choice among videographers due to its impressive video capabilities and robust feature set.',
      image:
        'https://amateurphotographer.com/wp-content/uploads/sites/7/2021/08/Panasonic-Lumix-GH5M2-Sensor.jpg',
    },
    {
      id: 9,
      name: 'Nikon Z7 II',
      description:
        'The Nikon Z7 II is a full-frame mirrorless camera with high-resolution imaging capabilities and advanced autofocus system.',
      image:
        'https://s.yimg.com/uu/api/res/1.2/8s_G_Iy3D63E9kTYtFFwNQ--~B/aD0xMTkyO3c9MTgwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2021-02/43a757f0-6494-11eb-ae9a-9a88d8a5050c.cf.jpg',
    },
    {
      id: 10,
      name: 'Canon EOS 5D Mark IV',
      description:
        'The Canon EOS 5D Mark IV is a popular DSLR camera known for its impressive image quality and versatile performance.',
      image:
        'https://d1hjkbq40fs2x4.cloudfront.net/2016-08-24/files/eos-5d-mark-iv_1377b.jpg',
    },
    {
      id: 11,
      name: 'Sony Cyber-shot RX100 VII',
      description:
        'The Sony Cyber-shot RX100 VII is a compact camera with a large sensor, advanced autofocus, and excellent video capabilities.',
      image:
        'https://i.pcmag.com/imagery/roundups/01y5w4b4OLtzL0zmIMclrW3-1..v1569492837.jpg',
    },
    {
      id: 12,
      name: 'Leica M10-P',
      description:
        'The Leica M10-P is a premium rangefinder camera with a timeless design, superb image quality, and manual controls.',
      image: 'https://www.35mmc.com/wp-content/uploads/2020/06/DSF0312.jpg',
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl  bg-gradient-to-b from-purple-500 to-red-500 bg-clip-text text-transparent uppercase font-bold text-center my-20">
        <Typewriter
          options={{
            strings: ['Cameras & Equipments'],
            autoStart: true,
            loop: true,
          }}
        />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className="card  h-96 mx-auto w-96"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <figure>
              <img
                className="h-52 object-cover w-full"
                src={camera.image}
                alt={camera.name}
              />
            </figure>
            <div className="card-body px-0">
              <h2 className="card-title">{camera.name}</h2>
              <p>{camera.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cameras;
