package com.app.user;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hash1 {

    String s;


    public Hash1() {

    }

    public BigInteger hashString(String s) throws NoSuchAlgorithmException {

        byte[] hash = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            hash = md.digest(s.getBytes());

        } catch (NoSuchAlgorithmException e) { e.printStackTrace(); }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < hash.length; ++i) {
            String hex = Integer.toHexString(hash[i]);
            if (hex.length() == 1) {
                sb.append(0);
                sb.append(hex.charAt(hex.length() - 1));
            } else {
                sb.append(hex.substring(hex.length() - 2));
            }
        }
        return new BigInteger(sb.toString().getBytes());
    }
    public static void main(String []   args) throws NoSuchAlgorithmException {
        Hash1 h = new Hash1();
        System.out.println(h.hashString("lamyae"));
    }
}