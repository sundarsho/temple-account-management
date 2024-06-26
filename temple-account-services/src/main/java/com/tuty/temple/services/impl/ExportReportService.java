package com.tuty.temple.services.impl;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
public class ExportReportService {

    public <T> byte[] exportToCSV(String fileName, Collection<T> data, Class<T> entityType, List<String> ignoreFields) throws IOException {
        // Get the fields of YourEntity class
        Field[] fields = entityType.getDeclaredFields();

        try (FileWriter writer = new FileWriter(fileName)) {
            // Write CSV header
            writeHeader(writer, fields, ignoreFields);

            // Write data rows
            for (T obj : data) {
                writeDataRow(writer, obj, fields,ignoreFields);
            }
            writer.flush();
        }
        return convertToByteArray(fileName);

    }

    public static byte[] convertToByteArray(String fileName) throws IOException {
        try (FileInputStream fis = new FileInputStream(fileName);
             ByteArrayOutputStream bos = new ByteArrayOutputStream()) {

            byte[] buffer = new byte[1024];
            int bytesRead;

            // Read from the file input stream and write to the ByteArrayOutputStream
            while ((bytesRead = fis.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
            }

            // Convert content to byte array
            return bos.toByteArray();
        }
    }

    private void writeHeader(FileWriter writer, Field[] fields, List<String> ignoreFields) throws IOException {
        // Write CSV header
        boolean isIgnoredField = false;
        for (int i = 0; i < fields.length; i++) {
            if(ignoreFields!=null){
                isIgnoredField = ignoreFields.stream().anyMatch(fields[i].getName()::equalsIgnoreCase);
            }

            if(!isIgnoredField){
                writer.append(splitCamelCase(fields[i].getName()));
                if (i < fields.length - 1) {
                    writer.append(",");
                }
            }
        }
        writer.append("\n");
    }

    private <T> void writeDataRow(FileWriter writer, T obj, Field[] fields, List<String> ignoreFields) throws IOException {
        // Write data row dynamically based on the fields
        boolean isIgnoredField = false;
        for (int i = 0; i < fields.length; i++) {
            if(ignoreFields!=null){
                isIgnoredField = ignoreFields.stream().anyMatch(fields[i].getName()::equalsIgnoreCase);
            }

            if(!isIgnoredField){
                fields[i].setAccessible(true);
                Object value = ReflectionUtils.getField(fields[i], obj);
                writer.append(String.valueOf(value));
                if (i < fields.length - 1) {
                    writer.append(",");
                }
            }
        }
        writer.append("\n");
    }

    public static String splitCamelCase(String s) {
        String str = s.replaceAll(
                String.format("%s|%s|%s",
                        "(?<=[A-Z])(?=[A-Z][a-z])",
                        "(?<=[^A-Z])(?=[A-Z])",
                        "(?<=[A-Za-z])(?=[^A-Za-z])"
                ),
                " "
        );
        return capitalizeFirst(str);
    }

    public static String capitalizeFirst(String word) {
        return word.substring(0, 1).toUpperCase()
                + word.substring(1).toLowerCase();
    }

}
