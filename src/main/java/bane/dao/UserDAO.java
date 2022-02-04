package bane.dao;

import bane.model.Role;
import bane.model.User;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {


    private static ConnectionPool connectionPool = ConnectionPool.getConnectionPool();
    private static final String SELECT_ALL = "SELECT id, username, ip_address, root_dir, role, permissions FROM user;";
    private static final String SELECT_BY_ID = "SELECT username, ip_address, root_dir, role, permissions FROM user where id=?;";
    // private static final String SELECT_BY_USERNAME = "SELECT * username, ip_address, file_id, role, permissions FROM user where username = ?";
    private static final String INSERT = "INSERT INTO user (username, password, salt, ip_address, root_dir, role, permissions) VALUES (?,?,?,?,?,?,?)";
    private static final String DELETE = "DELETE FROM user WHERE id=?";
    private static final String SELECT_SALT_BY_USERNAME = "SELECT salt FROM user WHERE username=?";
    private static final String UPDATE_USER = "UPDATE user SET username=? , password=? , salt=? , ip_address=? , root_dir=? , permissions=? WHERE id=?";

    private static final String SELECT_USER_BY_USERNAME_AND_PASSWORD = "SELECT id, username, ip_address, root_dir, role, permissions FROM user WHERE username=? AND password=?";
    private static final String SELECT_ADMIN_BY_USERNAME_AND_PASSWORD = "SELECT id, username, ip_address, root_dir, role, permissions FROM user WHERE username=? AND password=? AND role='A'";

    private static final String INSERT_TOKEN = "UPDATE user set token=? , token_expiration=? WHERE username=?";

    private static final String SELECT_USER_BY_MAIL = "SELECT id, username, ip_address, root_dir, role, permissions FROM user WHERE mail=?";

    public static String getSaltByUsername(String username) throws SQLException {
        String salt = null;
        Connection connection = null;
        ResultSet resultSet = null;
        Object values[] = {username};
        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection,
                    SELECT_SALT_BY_USERNAME, false, values);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
//                Blob blob = resultSet.getBlob("salt");
//                salt = blob.getBytes(1, (int) blob.length());
//                blob.free();
                salt = resultSet.getString("salt");
            }
            preparedStatement.close();
        } finally {
            connectionPool.checkIn(connection);
        }
        return salt;
    }

    public static void setToken(User user) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        boolean result = false;
        Object values[] = {user.getToken(), user.getTokenExpiration(), user.getUsername()};
        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection, INSERT_TOKEN, false, values);
            preparedStatement.executeUpdate();
            preparedStatement.close();

            System.out.println("Podesen token: " + user.getUsername() + " : " + user.getToken());
        } finally {
            connectionPool.checkIn(connection);
        }
        return;
    }


    public static List<User> selectAll() throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<User> users = new ArrayList<>();

        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection, SELECT_ALL, false);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Role enumVal = Role.valueOf(resultSet.getString("role"));
                users.add(new User(resultSet.getInt("id"), resultSet.getString("username"),
                        resultSet.getString("ip_address") == null ? "N/A" : resultSet.getString("ip_address"),
                        new File(resultSet.getString("root_dir")), enumVal, resultSet.getString("permissions")));
            }
        } finally {
            connectionPool.checkIn(connection);
        }
        return users;
    }

    public static User selectUserByUsernameAndPassword(String username, String password, boolean isAdminOnly) throws SQLException {
        User user = null;
        Connection connection = null;
        ResultSet resultSet = null;
        Object values[] = {username, password};
        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection,
                   isAdminOnly?SELECT_ADMIN_BY_USERNAME_AND_PASSWORD :SELECT_USER_BY_USERNAME_AND_PASSWORD, false, values);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                Role enumVal = Role.valueOf(resultSet.getString("role"));
                user = new User(resultSet.getInt("id"), resultSet.getString("username"),
                        resultSet.getString("ip_address"),
                        new File(resultSet.getString("root_dir")), enumVal, resultSet.getString("permissions"));
            }
            preparedStatement.close();
        } finally {
            connectionPool.checkIn(connection);
        }
        return user;
    }
    public static User selectUserByMail(String mail) throws SQLException {
        User user = null;
        Connection connection = null;
        ResultSet resultSet = null;
        Object values[] = {mail};
        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection,
                    SELECT_USER_BY_MAIL, false, values);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                Role enumVal = Role.valueOf(resultSet.getString("role"));
                user = new User(resultSet.getInt("id"), resultSet.getString("username"),
                        resultSet.getString("ip_address"),
                        new File(resultSet.getString("root_dir")), enumVal, resultSet.getString("permissions"));
            }
            preparedStatement.close();
        } finally {
            connectionPool.checkIn(connection);
        }
        return user;
    }


    public static boolean deleteById(Integer id) throws SQLException {
        Connection connection = null;
        Object values[] = {id};
        boolean result = false;
        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection,
                    DELETE, false, values);
            result = preparedStatement.executeUpdate() == 1;
            preparedStatement.close();
        } finally {
            connectionPool.checkIn(connection);
        }
        return result;
    }
//    public static User selectByIUsername(String username) throws SQLException {
//        Connection connection = null;
//        ResultSet resultSet = null;
//        User user = nulll;
//        try{
//            connection = connectionPool.checkOut();
//            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection, SELECT_BY_ID, false);
//            resultSet = preparedStatement.executeQuery();
//            while(resultSet.next()){
//                Role enumVal = Role.valueOf(resultSet.getString("role"));
//                users.add(new User(resultSet.getString("username"),
//                        resultSet.getString("ip_address") == null?"N/A":resultSet.getString("ip_address"),
//                        resultSet.getInt("file_id"), enumVal, resultSet.getString("permissions")));
//            }
//        } finally {
//            connectionPool.checkIn(connection);
//        }
//        return user;
//    }

    // private static final String INSERT = "INSERT INTO user (username, password, salt, ip_address, file_id, role, permissions) VALUES (?,?,?,?,?,?,?)";
    public static boolean add(User user) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        boolean result = false;
        Object values[] = {user.getUsername(), user.getHashedPassword(), user.getSalt(), user.getIpAddress(), user.getRootDir(), user.getRole().toString(), user.getPermissions()};
        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection, INSERT, true, values);
            preparedStatement.executeUpdate();
            resultSet = preparedStatement.getGeneratedKeys();

            if (preparedStatement.getUpdateCount() > 0)
                result = true;
            if (resultSet.next())/**/
                System.out.println("Bio sam u add id");
            user.setId((int)resultSet.getInt(1)); //iz nekog razloga ovo ne radi, a radilo je prije
            preparedStatement.close();

            System.out.println("Dodat korisnik: " + user.getUsername());
        } finally {
            connectionPool.checkIn(connection);
        }
        return result;
    }

    public static User getById(Integer Id) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;

        Object values[] = {Id};
        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection, SELECT_BY_ID, false, values);

            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                Role enumVal = Role.valueOf(resultSet.getString("role"));
                return new User(Id, resultSet.getString("username"),
                        resultSet.getString("ip_address") == null ? "N/A" : resultSet.getString("ip_address"),
                        new File(resultSet.getString("root_dir")), enumVal, resultSet.getString("permissions"));
            }
        } finally {
            connectionPool.checkIn(connection);
        }
        return null;
    }
    /*private static final String UPDATE_USER = "UPDATE user SET username=?, password=? , salt=? , ip_address=? , root_dir=? , permissions=? WHERE id=?";*/
    public static boolean updateUser(Integer Id, User user) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;

        Object values[] = {user.getUsername(), user.getHashedPassword(), user.getSalt(), user.getIpAddress(), user.getRootDir(), user.getPermissions(),  Id};
        try {
            connection = connectionPool.checkOut();
            PreparedStatement preparedStatement = DAOUtil.prepareStatement(connection, UPDATE_USER, false, values);

            int res = preparedStatement.executeUpdate();
            if (res == 1) {
                return true;
            }
        } finally {
            connectionPool.checkIn(connection);
        }
        return false;
    }
}
