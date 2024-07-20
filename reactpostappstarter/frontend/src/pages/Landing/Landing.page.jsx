import React from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Image,
  SimpleGrid,
  Card,
} from "@mantine/core";
import LoginPage from "../Auth/Login.page";
import { CommentHtml } from "../../components/misc/CommentHtml";
import classes from "./LandingPage.css";

const Landing = () => {
  return (
    <Container>
      <section id="hero" className={classes.hero}>
        <Title align="center" order={1}>
          Welcome to LensLounge
        </Title>
        <Text align="center" size="lg" mt="md">
          An app for photographers to upload and share posts about the photos
          they’ve taken.
        </Text>
        <Button fullWidth mt="xl" onClick={LoginPage}>
          Get Started
        </Button>
      </section>

      <section id="features" className={classes.features}>
        <Title align="center" order={2} mt="xl">
          Features
        </Title>
        <SimpleGrid cols={4} mt="md">
          <Card shadow="sm" padding="lg">
            <Card.Section>
              <Image src="./world.jpg" height={160} alt="Upload and Share" />
            </Card.Section>
            <Text mt="sm" align="center">
              Easily upload and share your photos with the world. Showcase your
              work and get feedback from other photographers.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg">
            <Card.Section>
              <Image src="./tag.jpg" height={160} alt="Create Detailed Posts" />
            </Card.Section>
            <Text mt="sm" align="center">
              Add descriptions, tags, and locations to your photos. Tell the
              story behind each shot.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg">
            <Card.Section>
              <Image
                src="./photographer.jpg"
                height={160}
                alt="Follow and Discover"
              />
            </Card.Section>
            <Text mt="sm" align="center">
              Follow other photographers and discover new styles and techniques.
              Build your network and get inspired.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg">
            <Card.Section>
              <Image
                src="./album.jpg"
                height={160}
                alt="Organize Your Gallery"
              />
            </Card.Section>
            <Text mt="sm" align="center">
              Organize your photos into albums and collections. Keep your work
              sorted and easy to find.
            </Text>
          </Card>
        </SimpleGrid>
      </section>

      <section id="screenshots" className={classes.screenshots}>
        <Title align="center" order={2} mt="xl">
          <span className={classes.titleColor}>See Inside LensLounge</span>
        </Title>
        <SimpleGrid cols={3} mt="md">
          <Image
            src="/pic1.jpg"
            height={160}
            alt="Green Trees on Mountain Under Blue Sky"
          />

          <Image
            src="/pic2.jpg"
            height={160}
            alt="Hawaii beaches: Green Trees Near Beach Water"
          />

          <Image
            src="/pic3.jpg"
            height={160}
            alt="Full Moon Over Black Mountain"
          />
        </SimpleGrid>
        <SimpleGrid cols={3} mt="md">
          <Text>
            "Green Trees on Mountain Under Blue Sky"
            <br /> By: "Gintarė Kairaitytė"
          </Text>
          <Text>
            "Hawaii beaches: Green Trees Near Beach Water"
            <br /> By: "Jess Loiterton"
          </Text>
          <Text>
            "Full Moon Over Black Mountain"
            <br /> By: "Pixabay"
          </Text>
        </SimpleGrid>
      </section>

      <section id="testimonials" className={classes.testimonials}>
        <Title align="center" order={2} mt="xl">
          What Our Users Say
        </Title>
        <SimpleGrid cols={2} mt="md">
          <CommentHtml
            name="John Brown"
            time="A week ago"
            src="./person2.jpg"
            comment="LensLounge is amazing! It has made sharing my photos so easy and fun!"
          />
          <CommentHtml
            name="Sarah Kim"
            time="Today"
            src="./person1.jpg"
            comment="I love how I can connect with other photographers and see their work."
          />
        </SimpleGrid>
      </section>
    </Container>
  );
};

export default Landing;
