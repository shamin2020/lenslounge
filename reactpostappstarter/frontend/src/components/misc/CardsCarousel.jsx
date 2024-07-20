import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Paper, Text, Title, useMantineTheme } from "@mantine/core";
import classes from "./CardsCarousel.module.css";

function Card({ image, title, category }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}

const data = [
  {
    image: "/pic1.jpg",
    title: "Green Trees on Mountain Under Blue Sky",
    category: "Gintarė Kairaitytė",
  },
  {
    image: "/pic2.jpg",
    title: "Hawaii beaches: Green Trees Near Beach Water",
    category: "Jess Loiterton",
  },
  {
    image: "/pic3.jpg",
    title: "Full Moon Over Black Mountain",
    category: "Pixabay",
  },
  {
    image: "/pic4.jpg",
    title: "Aurora in Norway: when to visit for best experience",
    category: "stein egil liland",
  },
  {
    image: "/pic5.jpg",
    title: "Birds Flying over Trees with Hoarfrost in Winter",
    category: "David Fröhlich",
  },
  {
    image: "/pic6.jpg",
    title: "Active volcano: River of Lava Flowing From an Erupting Volcano",
    category: "Björn Austmar Þórsson",
  },
];

export function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="50%"
      slideGap="md"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}
