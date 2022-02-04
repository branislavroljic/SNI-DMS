package bane.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.File;
import java.util.Date;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    private Integer id;
    private String username;
    private String hashedPassword;
    private String salt;
    private String ipAddress;
    private File rootDir;
    private Role role;
    private String permissions;
    private String token;
    private Date tokenExpiration;
    private boolean loggedIn = false;

    public User(Integer id, String username, String ipAddress, File rootDir, Role role, String permissions) {
        this.id = id;
        this.username = username;
        this.ipAddress = ipAddress;
        this.rootDir = rootDir;
        this.role = role;
        this.permissions = permissions;
    }

    public User(String username, String password, String salt, String ipAddress, File rootDir, Role role, String permissions) {
        this.username = username;
        this.hashedPassword = password;
        this.salt = salt;
        this.ipAddress = ipAddress;
        this.rootDir = rootDir;
        this.role = role;
        this.permissions = permissions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
