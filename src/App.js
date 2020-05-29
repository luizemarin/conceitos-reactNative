import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepositories() {
    const response = await api.post("repositories", {
      title: `New repo ${Date.now()}`,
      owner: "Luiz",
    });
    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(projects) => projects.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={handleAddRepositories}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* <View style={styles.container}>
        {projects.map((project) => (
          <Text style={styles.title} key={project.id}>
            {project.title}
          </Text>
        ))}
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  title: {
    color: "#fff",
    fontSize: 22,
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
