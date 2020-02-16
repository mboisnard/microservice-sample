package fr.lacombe.serialization;

import java.util.List;

public class User {

    private final String userName;
    private final String lastName;
    private final Integer age;
    private final List<Hobby> hobbies;

    public User(String userName, String lastName, Integer age, List<Hobby> hobbies) {
        this.userName = userName;
        this.lastName = lastName;
        this.age = age;
        this.hobbies = hobbies;
    }

    public String getUserName() {
        return userName;
    }

    public String getLastName() {
        return lastName;
    }

    public Integer getAge() {
        return age;
    }

    public List<Hobby> getHobbies() {
        return hobbies;
    }

    public static class Hobby {

        private final String name;

        public Hobby(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

}
