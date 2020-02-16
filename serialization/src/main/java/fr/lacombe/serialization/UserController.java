package fr.lacombe.serialization;

import fr.lacombe.serialization.User.Hobby;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Arrays.asList;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("user")
public class UserController {

    @GetMapping(
        produces = {
            APPLICATION_JSON_VALUE, APPLICATION_XML_VALUE, "application/x-yaml",
            APPLICATION_CBOR_VALUE, "application/x-jackson-smile", "application/ion+json", "application/x-msgpack"
        }
    )
    public User getUser() {
        return new User("John", "Doe", 25, asList(new Hobby("test"), new Hobby("test2")));
    }

    @GetMapping(
        value = "proto",
        produces = { APPLICATION_JSON_VALUE, "application/x-protobuf" }
    )
    public UserProto.User getUserWithProtoBuf() {
        return UserProto.User.newBuilder()
            .setUserName("John")
            .setLastName("Doe")
            .setAge(25)
            .addAllHobbies(asList(
                UserProto.Hobby.newBuilder().setName("test").build(),
                UserProto.Hobby.newBuilder().setName("test2").build()
            ))
            .build();
    }
}
