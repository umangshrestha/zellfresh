locals {
    iam_role_name = "${var.type}_${var.field}_role"
    datasource_name = "${var.type}_${var.field}_datasource"
}