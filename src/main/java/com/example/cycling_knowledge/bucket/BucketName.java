package com.example.cycling_knowledge.bucket;

public enum BucketName {

    PROFILE_IMAGE();

    private final String bucketName;

    BucketName() {
        this.bucketName = "skijumpingstats";
    }

    public String getBucketName() {
        return bucketName;
    }
}
