import 'dart:io';

import 'package:flutter/material.dart' as material;
import 'package:jaguar_orm/jaguar_orm.dart';
import 'package:meta/meta.dart';

part 'local_image.jorm.dart';

class LocalImage {
  @PrimaryKey()
  final String imagePath;

  @Column(isNullable: true)
  final String imageClass;

  @Column(isNullable: true)
  final DateTime saveDate;

  @IgnoreColumn()
  final File file;

  @IgnoreColumn()
  final material.FileImage imageFile;

  LocalImage({
    @required String imagePath,
    this.imageClass,
    this.saveDate,
    File file,
    material.FileImage imageFile,
  })  : imagePath = imagePath,
        file = file ?? File(imagePath),
        imageFile = material.FileImage(file ?? File(imagePath));

  LocalImage.copyWithClass(LocalImage image, String imageClass)
      : this(
          imagePath: image.imagePath,
          imageClass: imageClass,
          saveDate: image.saveDate,
          file: image.file,
          imageFile: image.imageFile,
        );

  LocalImage.copyWithDate(LocalImage image, DateTime saveDate)
      : this(
          imagePath: image.imagePath,
          imageClass: image.imageClass,
          saveDate: saveDate,
          file: image.file,
          imageFile: image.imageFile,
        );

  String get imageName {
    List<String> pathElements = imagePath.split('/');
    pathElements = pathElements.reversed.toList();
    return '${pathElements[0]}';
  }

  String get imagePathEnding {
    List<String> pathElements = imagePath.split('/');
    pathElements = pathElements.reversed.toList();
    return '${pathElements[3]}/${pathElements[2]}/${pathElements[1]}';
  }

  @override
  String toString() =>
      '{ $imagePath, $imageClass, ${saveDate.year}/${saveDate.month}/${saveDate.day}/${saveDate.hour}:${saveDate.minute} }';
}

@GenBean()
class LocalImageBean extends Bean<LocalImage> with _LocalImageBean {
  LocalImageBean(Adapter adapter) : super(adapter);

  @override
  String get tableName => 'localImages';
}
